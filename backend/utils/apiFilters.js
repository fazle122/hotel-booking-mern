

class ApiFilters{

    constructor(query, queryStr,reqUser,isPopulateData) {
        this.query = query;
        this.queryStr = queryStr;
        this.reqUser = reqUser;
        this.isPopulateData = isPopulateData
      }
      search() {
        const keyword = this.queryStr.keyword
          ? {
              name: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            }
          : {};
        
        if(this.reqUser && this.reqUser.isAdmin){
          if(this.isPopulateData){
            this.query = this.query.find({ ...keyword }).populate('user','name email').populate('cabin','name');
          }else{
            this.query = this.query.find({ ...keyword })
          }
        }else{
          if(this.isPopulateData){
            this.query = this.query.find({ user:this.reqUser?._id,...keyword }).populate('user','name email').populate('cabin','name');
          }else{
            this.query = this.query.find({ user:this.reqUser?._id,...keyword })
          }
        }
    
        return this;
      }
    
      filter() {
        const queryCopy = { ...this.queryStr };
    
        // Fields to remove
        const fieldsToRemove = ["keyword", "pageNo", "sortBy", "pageNumber"];
        fieldsToRemove.forEach((el) => delete queryCopy[el]);
    
        // Advance filter 
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
      }

      sort() {
        if (this.queryStr.sortBy) {
          const sortBy = this.queryStr.sortBy.split(',').join(' ');
          this.query = this.query.sort(sortBy);
        } else {
          this.query = this.query.sort('-createdAt');
        }
    
        return this;
      }
    
      pagination(resPerPage) {
        const currentPage = Number(this.queryStr.pageNo) || 1;
        const skip = resPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
      }



}


export default ApiFilters;