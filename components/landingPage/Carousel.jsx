"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const CarouselSidebar = () => {

    const settings = {
        dots:true,
        infinite:true,
        speed: 1000,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true,
        aytoPlaySpeed:3000,
        // prevArrow: true,
        // nextArrow: true,

    }

    const reviews = [
        {
            name: "Jane Acheya⭐⭐",
            profession: "Data Scientist",
            image:"https://img.freepik.com/free-photo/close-up-portrait-lovely-young-african-american-woman-with-curly-afro-haircut-smiling-with-happy-pleasant-expression-enjoying-winter-holidays-wearing-sweater-blue-wall_1258-35442.jpg?w=900&t=st=1703013977~exp=1703014577~hmac=cfacd45543c27e51a956736b13b9576ee49b80b102bab20cc50e4bb6199d4956",
            description: "Before Knowledge Hub, data analysis felt like a black box. Thanks to its engaging LMS and expert instructors, I unlocked the secrets of statistics, machine learning, and more"
        },
        {
            name: "Andy Wallace⭐⭐⭐",
            profession: "Software Engineer",
            image:"https://img.freepik.com/premium-photo/portrait-attentive-self-confident-man-looking-camera-with-serious-expression_2221-10147.jpg?w=900",
            description: "From front-end newbie to full-stack hero, Knowledge Hub's LMS empowered my software engineering journey. Its expert instructors demystified web development concepts, while hands-on projects gave me the chance to build real-world applications"
        },
        {
            name: "Jeremy Anwar⭐⭐⭐⭐",
            profession: "Cyber Security Expert",
            image:"https://img.freepik.com/free-photo/guy-stylish-hat-beige-jacket-smiles-shows-his-finger-camera_197531-23258.jpg?w=900&t=st=1703013871~exp=1703014471~hmac=9e5a9ee990d28f8643bab303b02bb892ca506855ba2bc06d51830de5e7624882",
            description: "The flexible learning paths catered to my interests, helping me become a well-rounded engineer equipped to navigate the ever-evolving tech landscape. Today, I solve complex problems and build innovative solutions with a contagious enthusiasm fueled by Knowledge Hub"
        },
        {
            name: "Alice Tems⭐⭐⭐",
            profession: "Data Analyst",
            image:"https://img.freepik.com/free-photo/confident-business-woman-portrait-smiling-face_53876-137693.jpg?w=740&t=st=1703013808~exp=1703014408~hmac=5172fb4d6a4723fb0d407fd65352cc6dfa95c11c98c018bc055f13afc5cd7062",
            description: "I graduated feeling confident in my abilities and landed my dream data scientist role shortly after. Knowledge Hub doesn't just teach skills, it builds confidence and opens doors."
        },
    ]

  return (
    <div className='p-12 max-w-7xl mx-auto mt-8 mb-4 bg-blue-400/20 rounded-lg'>
        <div className='space-y-6'>
            <h2 className='text-3xl font-semibold text-center'>TESTIMONIAL SECTION</h2>
            <Slider {...settings}>
            {reviews.map((review,index)=>{
                return (
                <div  key={index} className="mt-8">
                    <div className="flex gap-4">
                            <img src={review.image} alt="" className="h-[180px] w-[180px] rounded-full object-cover"  />
                        <div className="flex flex-col gap-3">
                            <p className="text-xl font-semibold italic">{review.profession}</p>
                            <p className="text-2xl text-slate-700">{review.description}</p>
                            <p className="text-xl font-semibold text-gray-600 mt-3">{review.name}</p>
                        </div>
                    </div>

                </div>
                )
            })}
            </Slider>
        </div>
    </div>
  )
}
