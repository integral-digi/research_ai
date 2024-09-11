"use client"
import { CanvasContainer } from '@practicaljs/react-canvas-kit'
import StopPropagation from './Controller';
import Panel from './Panel';

const Container = () => {
  return (
    <CanvasContainer>
        <section className="relative flex items-center justify-center">
            <StopPropagation />
            <section className="bottom-16 mx-auto sticky">
                <Panel />
            </section>
        </section>
    </CanvasContainer>
  )
}

export default Container;