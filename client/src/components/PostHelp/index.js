import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

import Axios from "axios";
import { Image } from "cloudinary-react";

const ThoughtForm = () => {
  const [thoughtText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [imageSelected, setImageSelected] = useState("");

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache, appending new thought to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      });
    },
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addThought({
        variables: { thoughtText, imageSelected },
      });

      // clear form value
      setText("");
      setCharacterCount(0);
      setImageSelected(0);
    } catch (e) {
      console.error(e);
    }
  };

  const uploadImage = () => {
    // console.log(files[0])
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "sadpuppyeyes");

    Axios.post(
      "https://api.cloudinary.com/v1_1/rogeliog/image/upload",
      formData
    ).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <input
        type="file"
        onChange={(e) => {
          setImageSelected(e.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>
      <Image style={{width: 300 }} cloudName="rogeliog" publicId="https://res.cloudinary.com/rogeliog/image/upload/v1629913792/aaxj0rfqiinbkb0u2nkm.jpg" /> 
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Need help with your pet? post here!"
          value={thoughtText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
