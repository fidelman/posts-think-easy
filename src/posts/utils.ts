import { RecoilState, RecoilValueReadOnly, selector } from "recoil";
import { searchQueryState } from "./search-presenter";
import { PostResponse } from "@/api/endpoints.schemas";
import format from "date-fns/format";

const cutText = (text: string, length = 30) =>
  text.length > 30 ? `${text.slice(0, length)}...` : text;

const formatDate = (rawDate: string) => format(new Date(rawDate), "dd/MM/yyyy");

export const searchablePostsViewModelCreator = (
  stateKey: string,
  programmerModel:
    | RecoilState<PostResponse[]>
    | RecoilValueReadOnly<PostResponse[]>
) =>
  selector({
    key: stateKey,
    get: async ({ get }) => {
      const viewModel = get(programmerModel);
      const searchQuery = get(searchQueryState).toLowerCase();

      return viewModel
        .filter(
          (post) =>
            post.published &&
            (post.title.toLowerCase().includes(searchQuery) ||
              post.content.toLowerCase().includes(searchQuery))
        )
        .sort((a, b) => {
          if (a.updatedAt < b.updatedAt) {
            return 1;
          } else if (a.updatedAt > b.updatedAt) {
            return -1;
          }
          return 0;
        })
        .map((post) => ({
          id: post.id,
          title: cutText(post.title),
          content: cutText(post.content),
          updatedAt: formatDate(post.updatedAt),
        }));
    },
  });
