[![npm version](https://img.shields.io/npm/v/ngx-text-highlighter.svg)](https://www.npmjs.com/package/ngx-text-highlighter)
[![GitHub release](https://img.shields.io/github/release/mmounirf/ngx-text-highlighter.svg)](https://github.com/mmounirf/ngx-text-highlighter/releases)
[![Build Status](https://travis-ci.org/mmounirf/ngx-text-highlighter.svg?branch=master)](https://travis-ci.org/mmounirf/ngx-text-highlighter)
[![GitHub issues](https://img.shields.io/github/issues/mmounirf/ngx-text-highlighter.svg)](https://github.com/mmounirf/ngx-text-highlighter/issues)

## Text Highlighter

Angular 5+ module for displaying editable textarea where you can highlight text selections and filter your previous selection based on highlighting color. Check it out live demo and play around with the options [here](https://mmounirf.github.io/ngx-text-highlighter/)

### Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Options](#options)
* [Example](#example)
* [Demo](https://mmounirf.github.io/ngx-text-highlighter/)

### Installation

```bash
npm install ngx-text-highlighter --save
```

### Usage

In your module add the following:
```
import { NgxTextHighlighterModule } from 'ngx-text-highlighter';

@NgModule({
  imports: [
    NgxTextHighlighterModule
  ]
})
```

In your component add the following:
```
<th-container></th-container>
```

### Options

| Key | Description | Type | Default |
| ----- | ----- | ----- | ----- |
| ```[colors]``` | Set of marker colors | ```Array<string>``` | ```['#f44336', '#ffeb3b', '#4caf50']``` |
| ```[markerStyle]``` | Marker Style, changes marker appearance | ```string``` | ```'fixed'```

### Example

```html
<th-container [colors]="['#e22525', '#25b2e2', '#3ee225','#e225d']" [markerStyle]="'float'"></th-container>
```
