import {
  Denops,
  ensureNumber,
  fn,
} from "https://deno.land/x/ddu_vim@v2.8.3/deps.ts";
import {
  BaseFilter,
  DduItem,
  ItemHighlight,
} from "https://deno.land/x/ddu_vim@v2.8.3/types.ts";

type Param = {
  name: string;
  hl_group: string;
};

export class Filter extends BaseFilter<Param> {
  async filter(args: {
    denops: Denops;
    filterParams: Param;
    items: DduItem[];
  }): Promise<DduItem[]> {
    for (const item of args.items) {
      const display = item.display ?? item.word;
      const width = ensureNumber(await fn.strlen(args.denops, display));
      const highlights: ItemHighlight[] = [];
      highlights.push({
        name: args.filterParams.name,
        hl_group: args.filterParams.hl_group,
        col: 1,
        width: width,
      });
      item.highlights = highlights;
    }
    return args.items;
  }
  params(): Param {
    return {
      name: "converter_highlight",
      hl_group: "Search",
    };
  }
}
