import {useEffect} from "react"
import "../../utils/tailwind.css"
import AOS from "aos";
import "aos/dist/aos.css"
import { background, textstyle, buttonstyle } from "../../utils/global"
import svgScroll from "../../../public/scroll.svg"


export default function Hero(){

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, [])

      

    return(
        <div className="w-screen h-screen overflow-hidden flex flex-col justify-center items-center bg-no-repeat relative " id = "hero" style={ background } data-aos-offset="15">
            <div className="flex items-center flex-col">
                <p className="text-center font-extrabold text-[12rem] leading-tight tracking-wider" style= { textstyle } data-aos="fade-left" data-aos-duration="700" data-aos-offset="15">Explore a nature<br /> sandbox.</p>
                <p className="text-center font-bold opacity-[0.9] leading-normal tracking-wide text-[1.5rem] pt-0" style= { textstyle } id = "small-head"><span data-aos="fade-up" data-aos-duration="700" className="inline-block">save the world,</span> <span  data-aos="fade-up" data-aos-duration="1500" className="inline-block" data-aos-offset="15">tree by tree.</span></p>
                <a className="text-[1.8rem] font-bold opacity-[0.95] block" id = "btn-outer" data-aos="fade-right" data-aos-duration="700" data-aos-offset="15"><p style= { buttonstyle } className="px-[5.8rem] py-4 rounded-[1rem] text-[1.8rem] font-semibold" id = "btn"><span className = "ml-[2.8rem]">PLAY</span></p></a>
            </div>
            <div className="-mb-[5vh] mt-32">
                <p className="text-[1.8rem] font-bold opacity-[0.8] tracking-wide mb-6" style = { textstyle }>Scroll Down</p>
                <img className="block ml-auto mr-auto" src={svgScroll} />
            </div>
        </div>
    )
}