"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Post } from '@/Types/PostsState';
import Image from 'next/image';
import { Box, Button, TextField } from '@mui/material';
import Postcomment from '../Postcomment/Postcomment';
import Link from 'next/link';
import CreateComment from '../createComment/createComment';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function PostCard({postInfo,checkTheValue}:{postInfo:Post,checkTheValue:boolean}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Card sx={{ maxWidth: "80%" , mx:"auto" ,my:2}}>
      <CardHeader
        avatar={
     <Image width={50} height={50} src={postInfo?.user.photo} alt={postInfo?.user.name}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postInfo?.user.name}
        subheader={new Date(postInfo?.createdAt).toLocaleString()}
      />
            <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
     {postInfo?.body}
        </Typography>
      </CardContent>
{postInfo?.image &&       <CardMedia
        component="img"
        height="194"
        image={postInfo?.image}
        alt="Paella dish"
      />}

      <CardActions sx={{display:"flex",justifyContent:"space-between"}}>

        <IconButton aria-label="add to favorites">
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ThumbUpOffAltIcon />
        </IconButton>

      </CardActions>
<Box sx={{p:"5px"}}>

  {postInfo?.comments.length > 0 && checkTheValue == true ? 
postInfo?.comments.map(comment => <Postcomment  commentInfo={comment}/>)
:
postInfo?.comments.length > 0 ? 
<Postcomment   commentInfo={postInfo.comments[0]}/>
:null
}

{checkTheValue !== true && postInfo?.comments.length > 0 ? 
  <Link href={`/post/${postInfo?._id}`}>
  <Button fullWidth sx={{p:1 , my:2}} variant="contained">
    Show More Comments
    </Button>
    </Link>
    :
    null
}

<CreateComment specificPost={postInfo?._id} />



</Box>


    </Card>
  );
}
