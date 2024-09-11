const StopPropagation = ({ children }: React.PropsWithChildren) => {
    const stopPropagation = (e: React.SyntheticEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };
    // Using `display: contents` to avoid adding extra styling or layout changes, 
    // while still being able to capture and stop events.
    return (
      <div style={{ display: 'contents' }} onPointerUp={stopPropagation} onPointerDown={stopPropagation} onClick={stopPropagation} onPointerMove={stopPropagation} onKeyUp={stopPropagation} onKeyDown={stopPropagation}>
        {children}
      </div>
    );
  }

export default StopPropagation;