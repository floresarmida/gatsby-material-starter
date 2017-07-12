import React from 'react';
import Helmet from 'react-helmet';
import Card from 'react-md/lib/Cards';
import CardText from 'react-md/lib/Cards/CardText';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import Link from 'gatsby-link';
import _ from 'lodash';
import UserInfo from '../components/UserInfo/UserInfo.jsx';
import Disqus from '../components/Disqus/Disqus.jsx';
import PostTags from '../components/PostTags/PostTags.jsx';
import PostCover from '../components/PostCover/PostCover.jsx';
import config from '../../data/SiteConfig';
import './atom-one-dark.css';
import './post.scss';

export default class PostTemplate extends React.Component {
  render() {
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = this.props.location.pathname;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div className="post-page md-grid--no-spacing">
        <Helmet
          title={`${post.title} | ${config.siteTitle}`}
        />

        <PostCover postNode={postNode} />
        <div className="md-grid md-cell--9 post-page-contents">

          <Card className="md-grid md-cell md-cell--12 post">
            <CardText className="post-body">
              <h1 className="md-display-3 post-header">{post.title}</h1>
              <div className="post-info">
                <CardTitle
                  avatar={<Avatar icon={<FontIcon iconClassName="fa fa-calendar" />} />}
                  title={`Published on ${post.date}`}
                  subtitle={`${postNode.timeToRead} min read`}
                />
                <Link to={`/categories/${_.kebabCase(post.category)}`}>
                  <CardTitle
                    avatar={<Avatar icon={<FontIcon iconClassName="fa fa-folder-open" />} />}
                    title={'In category'}
                    subtitle={post.category}
                  />
                </Link>
              </div>
              <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            </CardText>
            <PostTags tags={post.tags} />
          </Card>
          <UserInfo className="md-grid md-cell md-cell--12" config={config} />
          <Disqus post={post} />
        </div>
      </div>

    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
query BlogPostBySlug($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug }}) {
    html
    timeToRead
    frontmatter {
      title
      cover
      date
      category
      tags
    }
  }
}
`;
