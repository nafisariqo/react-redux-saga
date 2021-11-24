
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import * as types from "./redux/actionTypes";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));




function App() {
  const [expanded, setExpanded] = useState(false);
  // const [cardValue, setCardValue] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  const {recipes} = useSelector(state => state.data);

  const updateSearch = () => {
    setQuery(search);
    setSearch("");
  }
  
  let dispatch = useDispatch();
  
  
  useEffect (() => {
    dispatch({type: types.FETCH_RECIPE_START, query })
    // console.log(data[1].recipe.label)
  }, [query])
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, textAlign: 'center', marginBottom: 5 }}>
        <h2>Recipe Foods For Beginners</h2>
        {/* <ul>
          {data.map}
          <li></li>
        </ul> */}
        {/* {data.map((item) => {
          <h1>{item.recipe.label}</h1>
          console.log(item.recipe.label)
        })} */}
        {/* {recipes && recipes.hits && recipes.hits.map((data, index)=>{
          return <div key={index}>
            <h1>{data.recipe.label}</h1>
          </div>
        })} */}
        <form noValidate autoComplete="off">
          <TextField id="outlined-basic" 
          variant="outlined" 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} />
          <Button variant="contained" 
          color="primary"
          style= {{ width: "80px", height: "50px" }}
          onClick= {updateSearch}
          >Search</Button>
        </form>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {recipes && recipes.hits && recipes.hits.map((data, index)=>{
            console.log(data.recipe)
            return <Grid item xs={12} sm={4} md={4} key={index}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={data.recipe.label}
                  subheader={
                    <span>
                      {data.recipe.calories} kcal
                    </span>
                  }
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={data.recipe.image}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                  Signature food: {data.recipe.cuisineType}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph variant="h6">Ingredients:</Typography>
                    {data.recipe.ingredients.map((item) =>(
                      <Typography paragraph>{item.text}</Typography>
                    ))}
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
            })}
        </Grid>
      </Box>
    </div>
  );
}

export default App;