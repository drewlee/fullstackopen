import { Link } from 'react-router'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useBlogs } from '../stores/blogs'
import './Blogs.css'

const Blogs = () => {
  const blogs = useBlogs()

  return (
    <section>
      <Typography variant="h4" component="h2" sx={{ margin: '24px 0' }}>
        blogs
      </Typography>

      <Paper>
        <List sx={{ padding: 0 }}>
          {blogs.map((blog) => (
            <ListItem key={blog.id} disablePadding className="blogs-list-item">
              <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
                <ListItemText primary={`${blog.title} - ${blog.author}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </section>
  )
}

export default Blogs
