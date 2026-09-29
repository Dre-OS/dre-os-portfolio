import * as Devicon from "@devicon/react";
import ProfilePicture from "../components/ProfilePicture";


export default function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen min-w-screen py-2 gap-8">
                <div className="flex flex-col items-center gap-3">
                    <ProfilePicture />
                    <h1 className="font-sans text-4xl font-semibold">Hendre Leigh O. Sagabaen</h1>
                    <h2 className="font-mono text-xl font-semibold">Software Engineer | Fullstack Web Developer | Data science & Cybersecurity Enthusiast</h2>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="flex space-x-4 ">
                        {/* Language Logos */}
                        <Devicon.JavascriptPlainIcon size="40px" color="white" />
                        <Devicon.TypescriptPlainIcon size="40px" color="white" />
                        <Devicon.CsharpPlainIcon size="40px" color="white" />
                        <Devicon.VisualbasicPlainIcon size="40px" color="white" />
                        <Devicon.JavaPlainIcon size="40px" color="white" />
                        <Devicon.FlutterPlainIcon size="40px" color="white" />
                        <Devicon.PythonPlainIcon size="50px" color="white" />
                    </div>
                    <div className="flex space-x-4">
                        {/* Tools Logos */}
                        <Devicon.GithubOriginalIcon size="40px" color="white" />
                        <Devicon.GitPlainIcon size="40px" color="white" />
                        <Devicon.ReactOriginalIcon size="40px" color="white" />
                        <Devicon.NodejsPlainIcon size="40px" color="white" />
                        <Devicon.DockerPlainIcon size="50px" color="white" />
                        <Devicon.AzurePlainIcon size="40px" color="white" />
                        <Devicon.RabbitmqOriginalIcon size="40px" color="white" />
                        <Devicon.MongodbPlainIcon size="40px" color="white" />
                        <Devicon.MysqlOriginalIcon size="40px" color="white" />
                        <Devicon.SqlitePlainIcon size="40px" color="white" />
                        <Devicon.DotNetPlainIcon size="40px" color="white" />
                    </div>
                </div>
                {/* <Carousel items={["hello","world","lmao"]} visibleItems={2} renderItem={()=>{return item;}}></Carousel> */}
            </div>
        </>
    );
}
