eos-knowledge-electron-boilerplate
==================================

This is an application boilerplate which should set you up writing EndlessOS
knowledge content application powered by and electron frontend. This boilerplate
sets up all the tricky bits of application packaging, content initialization
and global search integration so you can focus on writing the UI for you
application.

**Note**: the frontend code here is practically non-existent. For a more example
of some actual app UI using this boilerplate, check out the [react branch](https://github.com/endlessm/eos-knowledge-electron-boilerplate/tree/react).

### Dependencies
First you will need node and npm installed. The
`com.endlessm.ElectronKnowledgeDevApp` flatpak app is a good way to get access
to these tools.

Then you will need electron-forge installed globally
```
npm install -g electron-forge
```

### Building
To install npm dependencies and pre-load content...
```
npm install
npm run download
```

To develop and test the application the application...
```
npm start
```

Finally, to build the flatpak app...
```
npm run make
```
which will build the flatpak in the `out/make` directory.

### Installing
Once you have built the flatpak, just install with
```
flatpak --user install --bundle out/make/com.endlessm.electron.myths.en_master_x86_64.flatpak
flatpak run com.endlessm.electron.myths.en
```

### Templating
You may want to power multiple knowledge apps with the same frontend code built
from this boilerplate. This boilerplate uses the [eos-knowledge-downloader](https://github.com/endlessm/eos-knowledge-downloader-node)
tool to seed content for the application.

You can use it to download different app.json manifests and load in different
content. Or you can use the
```
./template [app json path or uri]
```
script in the base of this repo to quickly build a lot of flatpaks with the
same frontend code.
