    import slider1 from "../assets/slider-1.png";
    import slider2 from "../assets/slider-2.png";
    import slider3 from "../assets/slider-3.png";
    import slider4 from "../assets/slider-4.png";
    import slider5 from "../assets/slider-5.png";

    import { TfiHeadphoneAlt } from "react-icons/tfi";
    import { PiBuildingOfficeLight } from "react-icons/pi";
    import { VscBook } from "react-icons/vsc";
    import { TbWorldSearch } from "react-icons/tb";
    import { BsPersonLinesFill } from "react-icons/bs";

// import project11 from "../assets/1_Enterprise_Innovation/InnovationCentre/4.png";
const project11 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/1_Enterprise_Innovation/InnovationCentre/4.png";

// import project12 from "../assets/1_Enterprise_Innovation/Lighthouse/2.png";
const project12 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/1_Enterprise_Innovation/Lighthouse/2.png";

// import project21 from "../assets/2_CustomerEngagement/ExperienceStore/1.png";
const project21 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/2_CustomerEngagement/ExperienceStore/1.png";

// import project22 from "../assets/2_CustomerEngagement/ServiceCenter/1.png";
const project22 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/2_CustomerEngagement/ServiceCenter/1.png";

// import project23 from "../assets/2_CustomerEngagement/VirtualMall/1.png";
const project23 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/2_CustomerEngagement/VirtualMall/1.png";

// import project31 from "../assets/3_Employee_Experience/HROnBoarding/1.png";
const project31 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/3_Employee_Experience/HROnBoarding/1.png";

// import project32 from "../assets/3_Employee_Experience/OneBC/1.png";
const project32 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/3_Employee_Experience/OneBC/1.png";

// import project41 from "../assets/4_Knowledge_Management/Cipla/1.png";
const project41 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/4_Knowledge_Management/Cipla/1.png";

// import project42 from "../assets/4_Knowledge_Management/KBL/1.png";
const project42 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/4_Knowledge_Management/KBL/1.png";

// import project43 from "../assets/4_Knowledge_Management/ONGC-exe/1.png";
const project43 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/4_Knowledge_Management/ONGC-exe/1.png";

// import project44 from "../assets/4_Knowledge_Management/ShivanE/1.png";
const project44 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/4_Knowledge_Management/ShivanE/1.png";

// import project51 from "../assets/5_LnD/CPCL/1.png";
const project51 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/5_LnD/CPCL/1.png";

// import project52 from "../assets/5_LnD/ReLearn/1.png";
const project52 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/5_LnD/ReLearn/1.png";

// import project53 from "../assets/5_LnD/Shell/1.png";
const project53 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/5_LnD/Shell/1.png";




    const stepsData = [
    {
        id:1,
        type: "icon",
        zone: "Enterprise Innovation",
        iconComponent: PiBuildingOfficeLight,
        step: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa",
        leftDesc: "Immersive 3D environments like Virtual Innovation Centers and Digital Showcases that enable dynamic content engagement, real-time collaboration, and impactful innovation storytelling.",
        href:"/swiper/1",
        imageUrl: slider1,
        imageUrlLeft: slider2,
        imageUrlMiddleTop: slider2,
        imageUrlMiddleBottom: slider2,
            projects: [
                {
                    id:"1",
                    href:"innovation-centre",
                    image: project11,
                    title: "Virtual Innovation Center",
                },
                {
                    id:"2",
                    href:"lighthouse",
                    image: project12,
                    title: "Digital Showcase",
                },
            ]
    },
    {
        id:2,
        type: "icon",
        iconComponent: TfiHeadphoneAlt,
        zone: "Customer Engagement",
        step: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
        leftDesc: "Interactive 3D platforms that transform traditional touchpoints into lifelike virtual experiences elevating the end-to-end customer journey.",
        href:"/swiper/2",
        imageUrl: slider2,
        imageUrlLeft: slider1,
        imageUrlMiddleTop: slider2,
        imageUrlMiddleBottom: slider2,
        projects: [
            {
                id:"3",
                href:"experience-store",
                image: project21,
                title: "Virtual Experience Store",
            },
            {
                id:"4",
                href:"service-center",
                image: project22,
                title: "Virtual Customer Service Center",
            },
            /*{
                id:"5",
                href:"virtual-mall",
                image: project23,
                title: "Virtual Mall",
            },*/
        ]
    },
    {
        id:3,
        type: "icon",
        iconComponent: BsPersonLinesFill,
        zone: "Employee Experience",
        href:"/swiper/3",
        step: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system",
        leftDesc: " Digital platforms that enhance employee engagement and streamline HR interactions, fostering connection, collaboration, and culture across the organization.",
        imageUrl: slider3,
        imageUrlLeft: slider4,
        imageUrlMiddleTop: slider2,
        imageUrlMiddleBottom: slider2,
        projects: [
            {
                id:"6",
                href:"hr-onboarding",
                image: project31,
                title: "HR Onboarding Platform",
            },
            {
                id:"7",
                href:"oneBC",
                image: project32,
                title: "Internal Networking Platform",
            },
        ]
    },
    {
        id:4,
        type: "icon",
        iconComponent: VscBook,
        zone: "Knowledge Management",
        href:"/swiper/4",
        step: "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.",
        leftDesc: "AI-driven platforms that deliver tailored, real-time insights enhancing knowledge access, productivity, and decision-making across specialized domains.",
        imageUrl: slider4,
        imageUrlLeft: slider3,
        imageUrlMiddleTop: slider2,
        imageUrlMiddleBottom: slider2,
        projects: [
            /*{
                id:"8",
                href:"cipla",
                image: project41,
                title: "Cipla",
            },*/
            {
                id:"9",
                href:"kbl",
                image: project42,
                title: "Business Query and Insights Assistant",
            },
            {
                id:"10",
                href:"ongc",
                image: project43,
                title: "AI-Powered Parliamentary Query Assistant",
            },
            {
                id:"11",
                href:"shivanE",
                image: project44,
                title: "Realistic 3D AI Assistant",
            },
        ]
    },
    {
        id:5,
        type: "icon",
        iconComponent: TbWorldSearch,
        zone: "Learning & Development",
        href:"/swiper/5",
        step: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        leftDesc: " Simulation-based learning solutions that combine 3D, VR, and AI technologies to deliver hands-on, self-paced training.",
        imageUrl: slider5,
        imageUrlLeft: slider1,
        imageUrlMiddleTop: slider2,
        imageUrlMiddleBottom: slider2,
        projects: [
            {
                id:"12",
                href:"cpcl",
                image: project51,
                title: "VR-Based Industrial Training Simulator",
            },
            {
                id:"13",
                href:"relearn",
                image: project52,
                title: "Interactive Learning Explorer Platform",
            },
            /*{
                id:"14",
                href:"shell",
                image: project53,
                title: "Shell",
            },*/
        ]
    },
    ];

    export default stepsData;
