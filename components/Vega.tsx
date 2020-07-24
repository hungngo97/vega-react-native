import React from "react"
import { Button, StyleSheet, Text, View as RNView } from "react-native"
import * as vega from 'vega';
import { SvgXml } from 'react-native-svg';
import vegaSpec from '../vegaSpecs/bar.vg.json';
import vegaliteSpec from '../vegaSpecs/bar.vl.json';
import { PlainObject, ViewListener } from './types';
import embed from 'vega-embed';
import { WebView } from 'react-native-webview';
import { htmlBase } from './constants';
import { View } from 'vega';
import { VisualizationSpec } from 'vega-embed';
import shallowEqual from './utils/shallowEqual';
import updateMultipleDatasetsInView from './utils/updateMultipleDatasetsInView';


export interface VegaProps {
    spec: PlainObject,
    data?: PlainObject;
}

interface State {
    svg: string,
    view: View | undefined
}

const EMPTY = {};

export class Vega extends React.Component<VegaProps, State> {
    constructor(props: VegaProps) {
        super(props);
        this.state = {
            svg: '',
            view: undefined
        }
    }

    async componentDidMount() {
        const view = new vega.View(vega.parse(vegaSpec as any), {
            renderer: 'none'
        });
        view.finalize();
        const svg = await view.toSVG();
        this.setState({ svg, view });
    }
    
    async componentDidUpdate(prevProps: VegaProps) {
        console.log('Received new props');
        await this.update();
        // if (!shallowEqual(this.props.data, prevProps.data)) {
        //     this.update();
        // }
    }

    modifyView = (action: ViewListener) => {
        const { view } = this.state;
        if (view) {
            action(view);
        }
      };

    async update() {
        // const { data } = this.props;
        // const { view } = this.state;

        // const currView = new vega.View(vega.parse(this.props.spec as any), {
        //     renderer: 'none'
        // });
        // currView.finalize();
        // const svg = await currView.toSVG();
        // this.setState({ svg, view: currView });
        // console.log('Setting new view');
        // if (view && data && Object.keys(data).length > 0) {
        //     this.modifyView(view => {
        //         updateMultipleDatasetsInView(view, data);
        //         view.resize().run();
        //     });
        // }
    }

    renderSvg() {
        if (this.state.svg) {
            console.log("Render svg");
            return (
                <SvgXml xml={this.state.svg}></SvgXml>
            )
        } 
    }

    async getSvgFromProps() {
        const view = new vega.View(vega.parse(this.props.spec as any), {
            renderer: 'none'
        });
        view.finalize();
        const svg = await view.toSVG();
        return svg;
    }

    render() {        
        return (
            <RNView style={styles.root}>
                {this.renderSvg()}
            </RNView>
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
  }
})