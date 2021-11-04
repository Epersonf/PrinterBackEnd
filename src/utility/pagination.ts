import { Model } from "mongoose";

export  async function pageValues(page: number, limit: number){
  const skip :number = (page - 1) * limit;
  return {
    skip: skip,
    limit: limit,
  };
}


export  async function showModelPagination<T>(query: any, model: Model<T>, ...select : string[]) : Promise<any> {
  try {
    const {id, page, limit, sort, ...otherParams} = query;

    if (id) return await model.findById(id);

    if (limit == undefined || page == undefined) return null;

    const pagination: any = await pageValues(page, limit);

    const models = await model
      .find(otherParams)
      .sort(sort)
      .select(select.join(" "))
      .skip(pagination.skip)
      .limit(pagination.limit);

    const count: number = await model
      .find(otherParams)
      .countDocuments();

    return { pagesAmount: Math.ceil(count/limit), list: models };
  } catch (error) {
    return null;
  }
}