import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import * as vega from 'vega';
import { SvgXml } from 'react-native-svg';
import vegaSpec from '../vegaSpecs/bar.vg.json';
import vegaliteSpec from '../vegaSpecs/bar.vl.json';
import { PlainObject } from './types';
import embed from 'vega-embed';
import { WebView } from 'react-native-webview';
import { htmlBase } from './constants';

export interface Props {
    spec: string,
    data?: PlainObject;
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

    onButtonClick = async () => {
        if (this.state.spec === vegaliteSpec) {
            const view = new vega.View(vega.parse(vegaSpec as any), {
                renderer: 'none'
            });
            view.finalize();
            const svg = await view.toSVG();
            this.setState({ svg, spec: vegaSpec });
        } else {
            const view = new vega.View(vega.parse(vegaliteSpec as any), {
                renderer: 'none'
            });
            view.finalize();
            const svg = await view.toSVG();
            this.setState({ svg, spec: vegaliteSpec });
        }
        console.log('Change spec');
    }   

    renderButton() {
        return (
            <Button title='Change Spec' onPress={this.onButtonClick}></Button>
        )
    }

    render() {
        return (
        <View style={styles.root}>
            {this.renderSvg()}
            {this.renderButton()}
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