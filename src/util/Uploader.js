/**
 * Haha! Fooled you. You think you could so easily upload files? NO!
 * ...you need an upload-specifc input button. It's the only way.
 * 
 * You'll get a file blob back, which you can transform into anything you want. There's some
 * helper functions to transform it to certain common types (like text). Careful though, they
 * are asynchronous!
 * 
 * Here's how:
 * - Instead of <button onClick={...}>, you do <input type="file" onChange={...}>.
 * - There's already a wrapper component that does this for you: <Upload>. Feel free to use it.
 * - And that's it really. If you want to custom style it or whatever, you can refer to its
 * implementation for more details.
 * 
 * See ya later! Peace!
 */
