# Web Publication Manifest

This space is now dedicated to examples and experiments around the [Web Publication Manifest](https://github.com/readium/webpub-manifest).

Work on the specification itself is now handled by the [Readium Foundation](https://github.com/readium/) based on initial ideas for EPUB BFF (Browser Friendly Format) as part of the [Readium-2 project](https://github.com/readium/readium-2).

## Live Demo

A live demo of a Web Publication is available at: https://hadriengardeur.github.io/webpub-manifest/examples/MobyDick/index.html

The manifest for this demo is available at: https://hadriengardeur.github.io/webpub-manifest/examples/MobyDick/manifest.json

Additional demos are also available:

- Moby-Dick with progressive enhancements can also be tested at: https://hadriengardeur.github.io/webpub-manifest/examples/progressive-enhancements/index.html
- a simple Web App for reading Web Publications is available at: https://hadriengardeur.github.io/webpub-manifest/examples/viewer/

## Related Projects

A number of related Github projects implement the Web Publication Manifest such as:

- [Web Publication JS](https://github.com/HadrienGardeur/webpub-js) for progressive enhancements on a Web Publication
- [Web Publication Viewer](https://github.com/HadrienGardeur/webpub-viewer) for a simple iframe-based viewer with offline support
- the [Readium 2 Streamer module](https://github.com/readium/readium-2/blob/master/streamer/README.md) outputs a Web Publication Manifest. [A Go version](https://github.com/readium/r2-streamer-go) and [a Swift version](https://github.com/readium/r2-streamer-swift) are currently in development.

In addition to this specification, two other specifications define more specialized profiles for Web Publications:

- [Audiobook Manifest](https://github.com/HadrienGardeur/audiobook-manifest)
- [Comics Manifest](https://github.com/HadrienGardeur/comics-manifest)

While both Audiobook Manifest and Comics Manifest are valid Web Publication Manifests, they offer the ability for dedicated apps to identify them, and also provide additional navigation capabilities that are specific to audiobooks/comics.
