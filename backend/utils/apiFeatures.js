class ApiFeatures{
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }
    //A little explanation 
    //After passing values to the constructor this.query = Product.find(). That means it can return all the products from the Product collection
    //Now for further filtering we can apply find() method along with queries in it to get the filtered products out of all products collection
    //for eg : Product.find() return all documents and 
    // Product.find().find({category: "Laptop"}) will first get all documents from first find() in the chain and then second find({category:"Laptop"}) will filter those results and return only those products which has category as Laptop

    //Features
    //--search feature -- that means all the documents will be fetched based on the query string in url or if there is empty query string then fetch all products. It is just like a search filter
    search(){
        const keyword = this.queryStr.keyword ? {
            name: {$regex: this.queryStr.keyword, $options: "i"}
        } : {}
        this.query = this.query.find({...keyword})
        return this;
    }


    //--filter feature -- it will also fetch data based on query string in url but here the query string will be consisting of the keywords from filters applied by user while in search feature the query string consist of the keyword entered in the search bar
    filter(){
        //copy all the keys of queryStr array
        let filterQueryStr = {...this.queryStr}
        // console.log("filterQueryStr before removing other keys", filterQueryStr);
        //Now we would like to only keep the filter keys in filterQueryStr and remove other unnecessary keys
        const removeKeywords = ["keyword", "page", "limit"]
        removeKeywords.forEach((key)=> delete filterQueryStr[key])
        //Now it only contains filter keys in the filterQueryStr array
        // console.log("filterQueryStr after removing other keys", filterQueryStr);
        //Now for the price filter we will have a range of price. In between this range we have to filter the products. We need to use $ symbol of mongoDB before we pass query to find().
        //So stringify the filterQueryStr
        let filterQueryStringified = JSON.stringify(filterQueryStr)
        //Now replace gt or gte or lt or lte with $gt or $gte or $lt or $lte respectively 
        filterQueryStr = filterQueryStringified.replace(/\b(gt|gte|lt|lte)\b/g, (str)=>`$${str}`);
        //Now convert the stringified string using JSON.parse()
        this.query = this.query.find(JSON.parse(filterQueryStr));
        return this;
    }

    //--pagination feature -- this feature will allow us to limit our data per page and divide the whole products collection into pieces
    pagination(resultsPerPage){
        const currentPage = Number(this.queryStr.page) || 1
        //How many items do we have to skip from the whole collection when we are on page=2 ? Answwer is resultsPerPage. If on page = n then items to skip will be (n-1)*resultsPerPage 
        const skipItems = (currentPage-1) * resultsPerPage
        //Now query for items from the collection limited to resultsPerPage and skipping items equal to skipItems
        this.query = this.query.limit(resultsPerPage).skip(skipItems)
        return this;
    }
}

module.exports= ApiFeatures