import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import BlogPostForm from "../component/BlogPostForm";
import { Context } from "../context/BlogContext";


const EditScreen = ({ navigation }) => {
    const id = navigation.getParam('id')
    const { state, editBlogPost } = useContext(Context)
    const blogPost = state.find(
        blogPost => blogPost.id === navigation.getParam('id')

    )
    return <BlogPostForm
        onSubmit={(title, content) => { () => editBlogPost(id, title, content, () => navigation.pop()) }}
        initialValues={{ title: blogPost.title, content: blogPost.content }}
    />
};



const styles = StyleSheet.create({});

export default EditScreen;