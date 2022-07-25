import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  uploadString,
  getMetadata,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

function InputBox() {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    addDoc(collection(db, "posts"), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    }).then((docum) => {
      if (imageToPost) {
        const storage = getStorage();
        const storageRef = ref(storage, `posts/${docum.id}`);
        uploadString(storageRef, imageToPost, "data_url").then((snapshot) => {
          getDownloadURL(snapshot.ref).then((URL) => {
            setDoc(
              doc(db, "posts", docum.id),
              { postImage: URL },
              { merge: true }
            );
            console.log("File available at ", URL);
          });
          removeImage();
        });
      }
    });

    inputRef.current.value = "";
  };
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0], console.log(e));
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };
  const removeImage = () => {
    setImageToPost(null);
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium-bold mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          alt="feedimg"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind ${session.user.name} ?`}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline:none"
          />
          <button hidden type="submit" onClick={sendPost}></button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={imageToPost} />

            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className=" flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="text-red-500 h-7" />
          <p className="text-size-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            type="file"
            hidden
            onChange={addImageToPost}
            ref={filePickerRef}
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="text-yellow-300 h-7" />
          <p className="text-size-xs sm:text-sm xl:text-base">
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
