import React from 'react'
import Card from '../components/Card'

export const Payment = () => {

    const Card_data = [
        {
            image: "amazon-logo.jpg",
            name: "Amazon",
            time: "5 day ago",
            title: "Web Designer",
            type1: "part time",
            type2: "senior level",
            salary: 1,
        },
        {
            image: "google-logo.jpg",
            name: "Google",
            time: "2 day ago",
            title: "UI / XI Designer",
            type1: "full time",
            type2: "junior level",
            salary: 2,
        },
        {
            image: "Microsoft-Logo.png",
            name: "Microsoft",
            time: "1 day ago",
            title: "UI / XI Designer",
            type1: "part time",
            type2: "senior level",
            salary: 3,
        },
        {
            image: "app-logo.png",
            name: "Meta",
            time: "3 day ago",
            title: "App Developer",
            type1: "full time",
            type2: "senior level",
            salary: 4,
        },
        {
            image: "netflix-logo.webp",
            name: "Netflix",
            time: "4 day ago",
            title: "Web Developer",
            type1: "part time",
            type2: "junior level",
            salary: 5,
        },
        {
            image: "logo-spotify.png",
            name: "Spotify",
            time: "2 day ago",
            title: "Graphic Designer",
            type1: "full time",
            type2: "senior level",
            salary: 6,
        }
    ]

    return (
        <>
            <div className='m-2 flex flex-wrap gap-5 justify-center items-center'>
                {Card_data.map((item, index) => (
                    <Card
                        key={index}
                        image={item.image}
                        name={item.name}
                        time={item.time}
                        title={item.title}
                        type1={item.type1}
                        type2={item.type2}
                        salary={item.salary}
                    />
                ))}
            </div>
        </>
    )
}