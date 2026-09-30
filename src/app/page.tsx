import * as Devicon from "@devicon/react";
import ProfilePicture from "../components/ProfilePicture";


export default function Home() {
    return (
        <>
            <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-x-hidden px-4 py-8 sm:px-6">
                <div className="flex w-full flex-col items-center gap-3">
                    <div className="flex w-full flex-col items-center gap-5">
                        <ProfilePicture />
                        <h1 className="text-center font-sans text-2xl font-semibold sm:text-4xl">Hendre Leigh O. Sagabaen</h1>
                    </div>
                    <h2 className="max-w-4xl text-center font-mono text-sm font-semibold leading-6 sm:text-xl">Software Engineer | Fullstack Web Developer | Data science & Cybersecurity Enthusiast</h2>
                </div>
                <div className="flex w-full flex-col items-center gap-3">
                    <div className="flex max-w-3xl flex-wrap justify-center gap-3 sm:gap-4">
                        {/* Language Logos */}
                        <Devicon.JavascriptPlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.TypescriptPlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.CsharpPlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.VisualbasicPlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.JavaPlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.FlutterPlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.PythonPlainIcon size="clamp(28px, 10vw, 50px)" color="white" />
                    </div>
                    <div className="flex max-w-5xl flex-wrap justify-center gap-3 sm:gap-4">
                        {/* Tools Logos */}
                        <Devicon.GithubOriginalIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.GitPlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.ReactOriginalIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.NodejsPlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.DockerPlainIcon size="clamp(28px, 10vw, 50px)" color="white" />
                        <Devicon.AzurePlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.RabbitmqOriginalIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.MongodbPlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.MysqlOriginalIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.SqlitePlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                        <Devicon.DotNetPlainIcon size="clamp(24px, 9vw, 40px)" color="white" />
                    </div>
                </div>
            </div>
        </>
    );
}
