import { Model } from "mongoose";

function pageValues(page: number, limit: number) : { skip: number, limit: number } {
  return {  skip: (page - 1) * limit, limit };
}


export async function showModelPagination<T>(query: any, model: Model<T>, ...select : string[]) : Promise<any> {
  try {
    const {id, page, limit, sort, name, ...otherParams} = query;

    if (id) return await model.findById(id);

    if (limit == undefined || page == undefined) return { pagesAmount: 0, list: [] };

    const pagination: { skip: number, limit: number} = await pageValues(page, limit);
    
    const findParams = {...otherParams};
    if (name != undefined && name != "") findParams.name = { $regex: ".*" + name + ".*" };

    const models = await model
      .find(findParams)
      .sort(sort)
      .select(select.join(" "))
      .skip(pagination.skip)
      .limit(pagination.limit)
      .exec();
    
    const count: number = await model
      .find(otherParams)
      .countDocuments()
      .exec();

    return { pagesAmount: Math.ceil(count/limit), list: models };
  } catch (error) {
    return null;
  }
}