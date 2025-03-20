import Quill from "quill";
import { RefObject, useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import { assets } from "../../assets/assets";
import { Chapter, Lecture, LectureDetails } from "../../Model/AddCourses";

const AddCourse = () => {
  const quilRef: RefObject<any> = useRef(null);
  const editorRef: RefObject<any> = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState<any>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const [currentChapterId, setCurrentChapterId] = useState<number>();
  const [lectureDetails, setLectureDetails] = useState<LectureDetails>({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action: string, chapterId?: number) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name");
      if (title) {
        const newChapter: Chapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0
              ? chapters[chapters.length - 1].chapterOrder + 1
              : 1,
          // chapters.length > 0 ? chapterId?.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter: any) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter: any) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (
    action: string,
    chapterId: number,
    lectureIndex?: number
  ) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter: any) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0]?.lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!quilRef.current && editorRef.current) {
      quilRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  });
  return (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <input
            type="text"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>course Description</p>
          <div ref={editorRef}></div>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              type="number"
              onChange={(e) => setCoursePrice(Number(e.target.value))}
              value={coursePrice}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 w-28 rounded border border-gray-500"
              required
            />
          </div>

          <div className="flex md:flex-row flex-col items-center gap-3">
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3">
              <img
                src={assets.file_upload_icon}
                alt=""
                className="p-3 bg-blue-500 rounded"
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(e.target.files[0]);
                  }
                }}
                accept="image/*"
                hidden
              />
              <img src={image ? URL.createObjectURL(image) : ""} alt="" />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            type="number"
            onChange={(e) => setDiscount(Number(e.target.value))}
            value={discount}
            placeholder="0"
            className="outline-none md:py-2.5 py-2 px-3 w-28 rounded border border-gray-500"
          />
        </div>

        {/* Chapter & Lectures */}
        <div>
          {chapters.map((chapter: Chapter, index: number) => (
            <div
              key={index}
              className="bg-white border border-gray-500 rounded-lg mb-2 mt-2"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                  />
                  <span className="font-semibold">
                    {index + 1} {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>
                <img
                  src={assets.cross_icon}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map(
                    (lecture: Lecture, lectureIndex: number) => (
                      <div
                        className="flex justify-between items-center mb-2"
                        key={lectureIndex}
                      >
                        <span>
                          {lectureIndex + 1} {lecture.lectureTitle} -{" "}
                          {lecture.lectureDuration} mins -{" "}
                          <a
                            href={lecture.lectureUrl}
                            target="_blank"
                            className="text-blue-500"
                          >
                            Link
                          </a>{" "}
                          - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                        </span>
                        <img
                          src={assets.cross_icon}
                          alt=""
                          className="cursor-pointer"
                          onClick={() =>
                            handleLecture(
                              "remove",
                              chapter.chapterId,
                              lectureIndex
                            )
                          }
                        />
                      </div>
                    )
                  )}
                  <div
                    className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                    onClick={() => handleLecture("add", chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className="flex justify-center items-center bg-blue-100 p-2 rounded-lg mt-2 cursor-pointer"
            onClick={() => handleChapter("add")}
          >
            + Add Chapter
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
                <div className="mb-2">
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    value={lectureDetails.lectureTitle}
                    className="mt-1 block w-full py-1 px-2 border  border-gray-500 rounded"
                  />
                </div>

                <div className="mb-2">
                  <p>Duration (minutes)</p>
                  <input
                    type="number"
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    value={lectureDetails.lectureDuration}
                    className="mt-1 block w-full py-1 px-2 border  border-gray-500 rounded"
                  />
                </div>

                <div className="mb-2">
                  <p>Lecture URL</p>
                  <input
                    type="text"
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    value={lectureDetails.lectureUrl}
                    className="mt-1 block w-full py-1 px-2 border border-gray-500 rounded"
                  />
                </div>

                <div className="mb-2 flex gap-2">
                  <p>is Preview Free?</p>
                  <input
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                    className="mt-1 scale-125"
                  />
                </div>

                <button
                  type="button"
                  onClick={addLecture}
                  className="w-full bg-blue-400 text-white px-4 py-2 rounded"
                >
                  Add
                </button>

                <img
                  src={assets.cross_icon}
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 w-4 cursor-pointer"
                  alt={"cross_icon"}
                />
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-block text-white w-max py-2.5 px-8 rounded my-4"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
