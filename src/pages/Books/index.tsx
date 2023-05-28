import { Button, TextField } from "@mui/material";
import Fields from "components/fields";
import { useDebugValue, useState } from "react";
import Create from "./create";
import Container from "modules/container";
import { http } from "services";
import { get } from "lodash";
import { useDebounce } from "hooks";

interface TBook {
  isbn: string;
  id: number;
  author: string;
  cover: string;
  title: string;
  published: number;
  book: TBook;
}
const Books = () => {
  const [modal, setModal] = useState<{
    create: boolean;
    update: boolean;
    data: { [key: string]: any } | null;
  }>({
    create: false,
    update: false,
    data: null,
  });

  const [search, setSearch] = useState<string>("");
  const searchValue = useDebounce(search, 1000);
  return (
    <div className="container p-5">
      <div className="flex justify-between sticky top-0 p-5 bg-white z-20">
        <div>
          <TextField
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            className="w-[400px]"
            label="Search"
          />
        </div>
        <Button
          onClick={() => setModal({ ...modal, create: true })}
          variant="contained"
        >
          Create book
        </Button>
      </div>

      <Container.All
        url={`/books${searchValue ? `/${searchValue}` : ""}`}
        name="books"
      >
        {({ items, isLoading }) => {
          const data: TBook[] = items as TBook[];
          const booksMapper = (books: TBook[]) => {
            return books.map((item, index) => {
              return {
                ...item.book,
                author: item.author ?? "",
                isbn: item?.isbn ?? item.book.isbn ?? "",
                title: item?.title ?? "",
                cover:
                  item?.cover ??
                  "https://as2.ftcdn.net/jpg/03/34/50/49/1024W_F_334504908_e1zuE0BdikLGtzyiHgHFsAtimGMDu6EO_NW1.jpg",
                id: item?.id ?? 1,
                published: item.published ?? "",
              };
            });
          };

          return (
            <div className="grid grid-cols-4 gap-8 py-5">
              {isLoading
                ? "Loading..."
                : booksMapper(data).map((item, index) => (
                    <div
                      key={item.id * index}
                      className="shadow relative group"
                    >
                      <div className="relative pb-[90%]">
                        <img
                          className="w-full h-full object-cover absolute left-0 top-0 "
                          src={item.cover}
                          alt={item?.isbn}
                        />
                      </div>
                      <div className="mt-4 p-2">
                        <span className="font-medium">Author:</span>{" "}
                        {item.author}
                      </div>
                      <div className="mt-4 p-2">
                        <span className="font-medium">Title:</span> {item.title}
                      </div>
                      <div className="mt-4 p-2">
                        <span className="font-medium">Published:</span>{" "}
                        {item.published}
                      </div>
                      <div className="mt-4 p-2">
                        <span className="font-medium">ISBN:</span> {item.isbn}
                      </div>
                      <div className="absolute group-hover:flex hidden top-0 left-0 w-full h-full bg-[rgba(243,244,246,0.5)]  items-center justify-center gap-4 ">
                        <div className="text-white bg-blue-500 w-[60px] h-[60px] flex items-center justify-center rounded-full cursor-pointer">
                          Edit
                        </div>
                        <div className="text-white bg-red-500 w-[60px] h-[60px] flex items-center justify-center rounded-full cursor-pointer">
                          Delete
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          );
        }}
      </Container.All>

      <Create
        isOpen={modal.create}
        handleCancel={() => setModal({ ...modal, create: false })}
      />
    </div>
  );
};

export default Books;
