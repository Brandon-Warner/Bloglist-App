/* eslint-disable indent */
import blogService from '../services/blogs'

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog,
        })
    }
}

export const likeBlog = blogId => {
    return async dispatch => {
        const updatedBlog = await blogService.addLike(blogId)
        dispatch({
            type: 'LIKE_BLOG',
            data: updatedBlog,
        })
    }
}

export const deleteBlog = blogId => {
    return async dispatch => {
        const removedBlog = await blogService.removeBlog(blogId)
        dispatch({
            type: 'DELETE_BLOG',
            data: removedBlog,
        })
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'LIKE_BLOG':
            // eslint-disable-next-line no-case-declarations
            const index = state.findIndex(b => b.id === action.data.id)
            return [
                ...state.slice(0, index),
                action.data,
                ...state.slice(index + 1),
            ]
        case 'DELETE_BLOG':
            console.log('ACTION.DATA: ', action.data)
            return [...state.filter(b => b !== action.data.id)]
        default:
            return state
    }
}

export default blogReducer
