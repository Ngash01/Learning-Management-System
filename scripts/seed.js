const { PrismaClient } = require("@prisma/client")

const prisma  = new PrismaClient()


const main = async()=>{

    try{
        const createCategory = await prisma.category.createMany({
            data:[
                {name: "Computer Science"},
                {name: "History and Government"},
                {name: "Music and Arts"},
                {name: "fitness and Health"},
                {name: "Web3 and Blockchain"},
                {name: "Accounting and Finance"}
            ]
        })
        console.log("Success!")
    }catch(err){
        console.log("An error occured seeding the database!", err)
    }finally{
        await prisma.$disconnect()
    }
}

main()


