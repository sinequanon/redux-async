import React from 'react'
import _ from 'lodash'
import { Card, CardTitle, CardText, CardHeader, CardMedia } from 'material-ui/Card'

import { sanitizeValue, createReactDescriptorFromHTML } from '../util/sanitizeValue'

export default ({ post }) => {
  // Target the resolutions array, which contains a number of different image
  // urls
  const resolutions = _.get(post, 'preview.images[0].resolutions', [])
  // Use the last element in the array, which is normally the largest resolution
  const previewUrlRaw = resolutions.length && resolutions[resolutions.length - 1].url
  // The urls contains encoded ampersands, so decode them using the sanitizeValue
  // method
  const previewUrl = sanitizeValue(previewUrlRaw)
  // Expose the post self text as a react descriptor
  const seltText = createReactDescriptorFromHTML(post.selftext_html)
  return <li>
    <Card>
      <CardHeader
        showExpandableButton={true}
        actAsExpander={true}
        title={post.title}
        avatar={previewUrl}/>
      { previewUrl &&
        <CardMedia
          expandable={true}
          overlay={post.subreddit && <CardTitle title={`/r/${post.subreddit}`}/>} >
          <img src={previewUrl}/>
        </CardMedia> }
      <CardTitle expandable={true} subtitle={post.title}/>
      {seltText && <CardText expandable={true}>{seltText}</CardText>}
    </Card>
  </li>
}
