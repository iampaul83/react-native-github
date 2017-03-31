import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ListView, Text, View, Image, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';


export class ListViewBasics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        };
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={rowData => {
                    return (
                        <TouchableNativeFeedback
                            onPress={this._onPressButton.bind(this, rowData)}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View>
                                <Text>{rowData.name}</Text>
                                <Image style={{ width: 50, height: 50 }} source={{ uri: rowData.owner.avatar_url }} />
                            </View>
                        </TouchableNativeFeedback>
                    )
                }}
                renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
            />
        );
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.search) !== JSON.stringify(nextProps.search)) {
            this._search(nextProps.search);
        }
    }

    _onPressButton(rowData) {
        Actions.repo({ title: rowData.full_name })
    }

    _search(text) {
        if (!text) {
            return
        }
        const api = `https://api.github.com/search/repositories?q=${encodeURI(text)}&sort=stars&order=desc&per_page=50`;
        return fetch(api)
            .then(res => res.json())
            .then(resData => resData.items)
            .then(data => {
                if (!data) {
                    console.error(api);
                    return
                }
                this.setState({ dataSource: this.state.dataSource.cloneWithRows(data) });
            })
            .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    /*
     * Removed for brevity
     */
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: '#8E8E8E',
    },
});
