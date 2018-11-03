## Text Highlighter

Angular 5+ module for displaying editable textarea where you can highlight text selections and filter your previous selection based on highlighting color.

### Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Options](#options)
* [Example](#example)

### Installation

```bash
npm install ngx-text-highlighter --save
```

### Usage

In module add following:
```
import { NgxTextHighlighterModule } from 'ngx-text-highlighter';

@NgModule({
  imports: [
    NgxTextHighlighterModule
  ]
})
```

In component add following:
```
<th-container></th-container>
```

### Options

| Key | Description | Type | Default |
| ----- | ----- | ----- | ----- |
| [colors] | Set of marker colors | ```Array<string>``` | ['#f44336', '#ffeb3b', '#4caf50'] |
| [markerStyle] | Marker Style, change marker appearance | ```string``` | ```'fixed'```

### Example

```html
<th-container [colors]="['#e22525', '#25b2e2', '#3ee225','#e225d']" [markerStyle]="'float'"></th-container>
```
