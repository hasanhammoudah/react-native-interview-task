export class MarketplaceService {
  static getCategories(item) {
    const unique = Array.from(new Set(item.map((i) => i.item_category)));
    return ["All", ...unique];
  }

  static filterItems(items, category) {
    if (!category || category === "All") return items;
    return items.filter((i) => i.item_category === category);
  }

  static paginate(items,page,pageSize){
    return items.slice(0,page * pageSize);
  }
}
