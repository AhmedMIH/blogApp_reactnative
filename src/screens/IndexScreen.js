import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native'
import { Context } from "../context/BlogContext";
import { Feather } from '@expo/vector-icons'


const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        getBlogPosts()

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        })

        return () => {
            listener.remove();
        }
    }, [])

    getBlogPosts()

    return <View>
        <FlatList
            keyExtractor={(blogPost) => blogPost.title}
            data={state}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                        <View style={Style.row}>
                            <Text style={Style.title}>{item.title}</Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Feather style={Style.icon} name='trash' />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )
            }} />

    </View>
}


IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name='plus' size={30} />
            </TouchableOpacity>
        )
    }
}


const Style = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderTopWidth: 1,
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24,
    }
});

export default IndexScreen;