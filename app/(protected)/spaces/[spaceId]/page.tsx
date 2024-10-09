const page = ({params:{spaceId}}:{params:{spaceId:string}}) =>{
    return(
        <div>
            <h1>Space page : {spaceId}</h1>
        </div>
    )
}

export default page