// fix-transcript.mjs
// Run: node fix-transcript.mjs
// This patches generate-blog-posts.mjs to fix the transcript fetching

import fs from 'fs';

const TARGET = './scripts/generate-blog-posts.mjs';
let code = fs.readFileSync(TARGET, 'utf-8');

// Find and replace the fetchTranscript function
const start = code.indexOf('async function fetchTranscript(videoId)');
if (start === -1) { console.log('fetchTranscript not found'); process.exit(1); }

// Find the end of the function (matching closing brace)
let braceCount = 0;
let end = start;
let foundFirst = false;
for (let i = start; i < code.length; i++) {
  if (code[i] === '{') { braceCount++; foundFirst = true; }
  if (code[i] === '}') { braceCount--; }
  if (foundFirst && braceCount === 0) { end = i + 1; break; }
}

const newFunction = `async function fetchTranscript(videoId) {
  try {
    const pageRes = await fetch(\`https://www.youtube.com/watch?v=\${videoId}\`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
    });
    const html = await pageRes.text();
    
    // Find captionTracks in the page data
    const idx = html.indexOf('"captionTracks":');
    if (idx === -1) { console.log('    No captions found in page'); return null; }
    
    // Extract the JSON array after "captionTracks":
    let bracketStart = html.indexOf('[', idx);
    let bracketEnd = html.indexOf(']', bracketStart);
    if (bracketStart === -1 || bracketEnd === -1) { console.log('    Could not parse captions'); return null; }
    
    const tracksJson = html.substring(bracketStart, bracketEnd + 1);
    let tracks;
    try { tracks = JSON.parse(tracksJson); } catch { 
      console.log('    JSON parse failed for caption tracks');
      return null; 
    }
    
    // Find English track
    const track = tracks.find(t => t.languageCode === 'en') 
      || tracks.find(t => (t.languageCode || '').startsWith('en')) 
      || tracks[0];
    
    if (!track || !track.baseUrl) { console.log('    No usable caption track'); return null; }
    
    // Unescape the URL (YouTube escapes \\u0026 as &)
    const captionUrl = track.baseUrl.replace(/\\\\u0026/g, '&');
    
    const capRes = await fetch(captionUrl);
    const capXml = await capRes.text();
    
    // Extract text from XML caption format
    const parts = [];
    let textMatch;
    const textRe = new RegExp('<text[^>]*>([^<]*)</text>', 'g');
    while ((textMatch = textRe.exec(capXml)) !== null) {
      let t = textMatch[1]
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
      if (t) parts.push(t);
    }
    
    if (parts.length === 0) { console.log('    No text found in captions'); return null; }
    console.log(\`    Found \${parts.length} caption segments\`);
    return parts.join(' ');
  } catch (err) {
    console.log(\`    Transcript fetch failed: \${err.message}\`);
  }
  return null;
}`;

code = code.substring(0, start) + newFunction + code.substring(end);
fs.writeFileSync(TARGET, code);
console.log('✅ fetchTranscript function patched successfully');
console.log('Now run: node scripts/generate-blog-posts.mjs');
