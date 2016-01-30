#Browser-friendly format for EPUB 3.1

EPUB as it exists today is not directly usable by a web browser. The web-friendly content files are inside a zip package, which also contains container and package files expressed in a custom XML vocabulary. 

The goal of a browser-friendly format (henceforth EPUB-BFF) is to make it easier for web developers to display EPUB content by [1] allowing an unzipped ("exploded") publication, and [2] by providing an alternative JSON serialization of the information in container.xml and the package document(s).

##Content Documents

EPUB-BFF content documents are identical to those in EPUB 3.1.


>**Note:** EPUB 3.1 now allows the HTML serialization of HTML5. 


##Containers

Ordinary EPUBs must be packaged in an EPUB Container as defined in [OCF31]. EPUB-BFF is not defined in a packaged state (although this may change in the future), but exists only as a file system container.  The EPUB-BFF JSON package file may be included in an ordinary packaged EPUB if referenced properly, but reading systems have no obligation to read the JSON package file in this context.

The JSON package document described below must be named `package.json` and must appear at the top level of the file system container.

##The JSON Package Document

###Introduction

A single JSON package document replaces both container.xml and the package file(s). All of these files consist of essentially two things—metadata and links. So with only the concepts of metadata and links, we can express document metadata, manifests, the spine, rendition metadata, and collections.

###Data Model

The JSON package file consists of a metadata object, followed by one or more collection objects. EPUB 3.0.1 defines a collection as "a related group of resources." We are extending this term so that any rendition of a publication can be described as a collection. The key for a collection is the name of that collection. An EPUB-BFF must have at least one rendition collection. 

A collection consists of metadata and links. The link array describes both the required publication resources ("manifest") and their sequence ("spine"). Note that this avoids the duplication inherent in the manifest/spine model of EPUB, as well as the need for id and idrefs.

#####Example 1. Simple JSON package document.
```json
{
  "metadata": {
    "title": "Moby Dick",
    "language": "en",
    "identifier": {
      "type": "unique-identifier",
      "value": "9780000000001",
      "modified": "2015-09-29T17:00:00Z"
    }
  },

  "rendition": {
    "links": [{
      "href": "cover.jpg",
      "type": "image/jpeg",
      "properties": "cover-image"
    }, {
      "href": "c001.html",
      "type": "text/html"
    }, {
      "href": "c002.html",
      "type": "text/html"
    }, {
      "href": "toc.html",
      "type": "text/html",
      "properties": "nav"
    }, {
      "href": "style.css",
      "type": "text/css"
    }]
  }
}
```

The package assumes that resources of type `text/html` or `application/xhtml+xml` are in the "spine," and that any other types (like 'text/css') are not in the spine, unless otherwise specified. For example, if you wish to omit the `nav` document from the reading order:


#####Example 2. Content Document outside spine
```json
{
  "href": "toc.html",
  "type": "text/html",
  "properties": "nav",
  "sequence": "false"
}
```

Or include an SVG file as a spine item:

#####Example 3. SVG document in spine
```json
{
  "href": "page001.svg",
  "type": "image/svg+xml",
  "sequence": "true"
}
```

###The `links` object

Each publication component is described by a `links` object, which consists of the following key/value pairs. The `href` and `type` pairs are required. 

| Name  | Value | Format | Required? |
| ------------- | ------------- | ------------- | ------------- |
| href  | link location  | URI  | Yes  |
| type  | MIME type of resource  | MIME media type  | Yes  |
| sequence  | is the linked resource part of the linear reading order?  | boolean  | No  |
| title  | title of the linked resource  | text  | No  |
| rel  | relationship  | TK  | No  |
| properties  | properties associated with the linked resource  | see [list of property values](http://www.idpf.org/epub/301/spec/epub-publications.html#sec-item-property-values)  | No  |
| templated  | indicates linked resource is a URI template  | boolean  | No  |


###Types of collections

####Rendition collections

Each EPUB-BFF must have at least one rendition collection, but can have as many as required. If there is more than one rendition collection, each must have rendition metadata to allow the reading system to select the proper rendition.


>**Issue:** Rendition mapping


#####Example 4: Multiple renditions with selection metadata
```json
{ 
"example": "tk" 
}

```



####Preview collections

#####Example 5: preview collection


```json
{ 
"example": "tk" 
}

```


####Distributable objects

#####Example 6: distributable object collection

```json 
{
  "metadata": {
    "title": "Phantom Textbook - Chapter 1",
    "language": "en",
    "type": "distributable-object",
    "identifier": {
      "type": "unique-identifier",
      "value": "urn:uuid:a46825d1-e796-4cc3-a633-5160f529a1e0",
      "modified": "2014-11-10T19:30:22Z"
    },
    "creator": "Jane Doe",
    "description": "Introduction to the history of phantasms. For sale separately.",
    "source": "urn:isbn:9780987654321",
    "date": "2014-10-31",
    "rights": "All rights reserved. Not available for use or sale except by authorized vendors."
  },

  "distributable-object": {

    "links": [{
      "href": "xhtml/chapter01.xhtml",
      "type": "application/xhtml+xml"
    }, {
      "href": "xhtml/notes.xhtml",
      "type": "application/xhtml+xml"
    }, {
      "href": "xhtml/biblio.xhtml#b001",
      "type": "application/xhtml+xml"
    }, {
      "href": "xhtml/biblio.xhtml#b023",
      "type": "application/xhtml+xml"
    }, {
      "href": "xhtml/biblio.xhtml#b029",
      "type": "application/xhtml+xml"
    }, {
      "href": "css/epub.css",
      "type": "text/css"
    }]

  }
}
```

####Collection collections

#####Example 7: index group


###Media overlays

#####Example 8: media overlays
```json
{
  "metadata": {
    "title": "Audio Book",
    "language": "en",
    "identifier": {
      "type": "unique-identifier",
      "value": "qqq",
      "modified": "2016-01-01T00:00:01Z"
    },
    "creator": "Jane Doe"
  },

  "rendition": {

    "metadata": {
      "duration": "1:36:20",
      "narrator": "Joe Speaker",
      "active-class": "-epub-media-overlay-active",
      "playback-active-class": "-epub-media-overlay-playing"
    },

    "links": [{
        "href": "xhtml/chapter01.xhtml",
        "type": "application/xhtml+xml",
        "media-overlay": "chapter1_audio.smil"
      },

      {
        "href": "xhtml/chapter02.xhtml",
        "type": "application/xhtml+xml",
        "media-overlay": "chapter2_audio.smil"
      },

      {
        "href": "xhtml/chapter03.xhtml",
        "type": "application/xhtml+xml",
        "media-overlay": "chapter3_audio.smil"
      }, {
        "href": "css/epub.css",
        "type": "text/css"
      }, {
        "href": "chapter1_audio.smil",
        "type": "application/smil+xml"
      }, {
        "href": "chapter2_audio.smil",
        "type": "application/smil+xml"
      }, {
        "href": "chapter3_audio.smil",
        "type": "application/smil+xml"
      }, {
        "href": "chapter1_audio.mp3",
        "type": "audio/mpeg",
        "duration": "0:32:29"
      }, {
        "href": "chapter2_audio.mp3",
        "type": "audio/mpeg",
        "duration": "0:34:02"
      }, {
        "href": "chapter3_audio.mp3",
        "type": "audio/mpeg",
        "duration": "0:29:49"
      }
    ]
  }

}
```

