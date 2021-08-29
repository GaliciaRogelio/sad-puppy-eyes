import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

const ThoughtList = ({ thoughts, title }) => {
  
  const [imageIds, setImageIds] = useState();
  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    loadImages();
  }, []);
  
  if (!thoughts.length) {
    return <h3>No Woofs Yet</h3>;
  }

  return (
    <div>
      <h3 className="postListTitle">{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}
              </Link>{" "}
              woofed on {thought.createdAt}
            </p>
            <div className="card-body">
                {imageIds &&
                  imageIds.map((imageId, index) => (
                    <Image
                      key={index}
                      cloudName='rogeliog'
                      publicId={imageId}
                      width="300"
                      height="200"
                      crop="scale"
                    />
                  ))}
              <Link to={`/thought/${thought._id}`}>
                <p>{thought.thoughtText}</p>
                <p className="mb-0">
                  Woofs back: {thought.reactionCount} || Click to{" "}
                  {thought.reactionCount ? "see" : "start"} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
