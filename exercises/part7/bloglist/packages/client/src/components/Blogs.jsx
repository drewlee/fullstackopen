import { Link } from 'react-router'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useBlogs } from '../stores/blogs'

const Blogs = () => {
  const blogs = useBlogs()

  return (
    <div>
      <Typography variant="h4" component="h2" sx={{ margin: '24px 0' }}>
        blogs
      </Typography>

      <List>
        {blogs.map((blog) => (
          <ListItem key={blog.id} disablePadding className="blogs-list-item">
            <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
              <ListItemText primary={`${blog.title} - ${blog.author}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Blogs
