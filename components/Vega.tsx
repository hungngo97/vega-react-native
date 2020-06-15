import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import * as vega from 'vega';
import { SvgXml } from 'react-native-svg';
import vegaSpec from '../vegaSpecs/bar.vg.json';
import vegaliteSpec from '../vegaSpecs/bar.vl.json';

export interface Props {
}

interface State {
    svg: string,
    spec: any
}

export class Vega extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
        svg: '',
        spec: null
    }
  }

  async componentDidMount() {
    const view = new vega.View(vega.parse(vegaSpec as any), {
        renderer: 'none'
      });
    view.finalize();
    const svg = await view.toSVG();
    console.log('Current svg', svg);
    this.setState({ svg, spec: vegaSpec });
  }

  renderSvg() {
    if (this.state.svg) {
        console.log("Render svg");
        return (
            <SvgXml xml={this.state.svg}></SvgXml>
        )
    } 
}

  render() {
    return (
      <View style={styles.root}>
        {this.renderSvg()}
      </View>
    )
  }
}

// styles

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center"
  },
  buttons: {
    flexDirection: "row",
    minHeight: 70,
    alignItems: "stretch",
    alignSelf: "center",
    borderWidth: 5
  },
  button: {
    flex: 1,
    paddingVertical: 0
  },
  greeting: {
    color: "#999",
    fontWeight: "bold"
  }
})