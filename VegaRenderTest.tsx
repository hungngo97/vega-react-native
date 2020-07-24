import React from "react"
import vegaSpec from './vegaSpecs/bar.vg.json';
import vegaliteSpec from './vegaSpecs/bar.vl.json';
import data from './vegaSpecs/data1.json';
import { Vega } from './components/Vega';

import { Button, StyleSheet, Text, View as RNView } from "react-native"


interface Props {

}

interface State {
    spec: object,
    data: object,
    isShowingVegaliteSpec: boolean
}

export class VegaRenderTest extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    
        this.state = {
                spec: {},
                data: {},
                isShowingVegaliteSpec: false
            }
    }
    
    componentDidMount() {
        
    }

    onButtonClick = () => {
        this.setState({ 
            spec: this.state.isShowingVegaliteSpec ? vegaSpec : vegaliteSpec,
            isShowingVegaliteSpec: !this.state.isShowingVegaliteSpec
        });
    }   

    renderButton() {
        return (
            <Button title='Change Spec' onPress={this.onButtonClick}></Button>
        )
    }

    render() {
        return (
            <RNView style={styles.root}>
                <Vega spec={this.state.isShowingVegaliteSpec ? vegaliteSpec : vegaSpec} />
                {this.renderButton()}
            </RNView>
        )
    }
}

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
