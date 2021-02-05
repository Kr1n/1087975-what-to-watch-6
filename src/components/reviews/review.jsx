import React from 'react';

const Review = () => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">I didn&amp;apos;t find it amusing, and while I can appreciate the creativity,
      it&amp;apos;s an hour and 40 minutes I wish I could take back.</p>

      <footer className="review__details">
        <cite className="review__author">Amanda Greever</cite>
        <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
      </footer>
    </blockquote>

    <div className="review__rating">8,0</div>
  </div>
);


export default Review;
