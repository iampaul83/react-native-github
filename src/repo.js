import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native';
import Markdown from 'react-native-showdown';
import { Actions } from 'react-native-router-flux';


export default class RepoScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      md: ''
    };
    Actions.refresh({
      rightTitle: 'Github',
      onRight: () => Linking.openURL(`https://github.com/${props.title}`)
    });

  }

  componentDidMount() {
    const api = `https://raw.githubusercontent.com/${this.props.title}/master/README.md`;

    fetch(api)
      .then(res => res.text())
      .then(md => {
        this.setState({ md: md });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Markdown
        body={this.state.md}
        pureCSS={'html { font-size: 100%; overflow-y: scroll; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }\n\nbody{\ncolor:#444;\nfont-family:Georgia, Palatino, \'Palatino Linotype\', Times, \'Times New Roman\', serif;\nfont-size:12px;\nline-height:1.5em;\npadding:1em;\nmargin:auto;\nmax-width:42em;\nbackground:#fefefe;\n}\n\na{ color: #0645ad; text-decoration:none;}\na:visited{ color: #0b0080; }\na:hover{ color: #06e; }\na:active{ color:#faa700; }\na:focus{ outline: thin dotted; }\na:hover, a:active{ outline: 0; }\n\n::-moz-selection{background:rgba(255,255,0,0.3);color:#000}\n::selection{background:rgba(255,255,0,0.3);color:#000}\n\na::-moz-selection{background:rgba(255,255,0,0.3);color:#0645ad}\na::selection{background:rgba(255,255,0,0.3);color:#0645ad}\n\np{\nmargin:1em 0;\n}\n\nimg{\nmax-width:100%;\n}\n\nh1,h2,h3,h4,h5,h6{\nfont-weight:normal;\ncolor:#111;\nline-height:1em;\n}\nh4,h5,h6{ font-weight: bold; }\nh1{ font-size:2.5em; }\nh2{ font-size:2em; }\nh3{ font-size:1.5em; }\nh4{ font-size:1.2em; }\nh5{ font-size:1em; }\nh6{ font-size:0.9em; }\n\nblockquote{\ncolor:#666666;\nmargin:0;\npadding-left: 3em;\nborder-left: 0.5em #EEE solid;\n}\nhr { display: block; height: 2px; border: 0; border-top: 1px solid #aaa;border-bottom: 1px solid #eee; margin: 1em 0; padding: 0; }\npre, code, kbd, samp { color: #000; font-family: monospace, monospace; _font-family: \'courier new\', monospace; font-size: 0.98em; }\npre { white-space: pre; white-space: pre-wrap; word-wrap: break-word; }\n\nb, strong { font-weight: bold; }\n\ndfn { font-style: italic; }\n\nins { background: #ff9; color: #000; text-decoration: none; }\n\nmark { background: #ff0; color: #000; font-style: italic; font-weight: bold; }\n\nsub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }\nsup { top: -0.5em; }\nsub { bottom: -0.25em; }\n\nul, ol { margin: 1em 0; padding: 0 0 0 2em; }\nli p:last-child { margin:0 }\ndd { margin: 0 0 0 2em; }\n\nimg { border: 0; -ms-interpolation-mode: bicubic; vertical-align: middle; }\n\ntable { border-collapse: collapse; border-spacing: 0; }\ntd { vertical-align: top; }\n\n@media only screen and (min-width: 480px) {\nbody{font-size:14px;}\n}\n\n@media only screen and (min-width: 768px) {\nbody{font-size:16px;}\n}\n\n@media print {\n  * { background: transparent !important; color: black !important; filter:none !important; -ms-filter: none !important; }\n  body{font-size:12pt; max-width:100%;}\n  a, a:visited { text-decoration: underline; }\n  hr { height: 1px; border:0; border-bottom:1px solid black; }\n  a[href]:after { content: " (" attr(href) ")"; }\n  abbr[title]:after { content: " (" attr(title) ")"; }\n  .ir a:after, a[href^="javascript:"]:after, a[href^="#"]:after { content: ""; }\n  pre, blockquote { border: 1px solid #999; padding-right: 1em; page-break-inside: avoid; }\n  tr, img { page-break-inside: avoid; }\n  img { max-width: 100% !important; }\n  @page :left { margin: 15mm 20mm 15mm 10mm; }\n  @page :right { margin: 15mm 10mm 15mm 20mm; }\n  p, h2, h3 { orphans: 3; widows: 3; }\n  h2, h3 { page-break-after: avoid; }\n}\n'}
      />
    );
  }
}
