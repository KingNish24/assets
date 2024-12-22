    // Preventing right-click
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
       alert('Right-click is disabled.');
     });

    // Preventing iframe injection
    // Check if the page is being loaded in an iframe
     if (window.top !== window.self) {
        // Redirect to the top-level window
        window.top.location = window.self.location;
    }

    // Preventing F12 and Ctrl+Shift+I
    document.addEventListener('keydown', function (e) {
      if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
           (e.ctrlKey && e.key === 'U')
       ) {
            e.preventDefault();
           alert('DevTools shortcuts are disabled.');
       }
    });

    // Detect DevTools by measuring screen resizing
    (function () {
        let element = new Image();
        Object.defineProperty(element, 'id', {
            get: function () {
               alert('DevTools is open. Please close it to continue using this site.');
               document.body.innerHTML = '';
           }
       });
        console.log(element);
    })();

    // Check for DevTools using timing detection
    setInterval(function () {
        const start = performance.now();
        debugger;
        const end = performance.now();
        if (end - start > 100) {
            alert('DevTools is open! Please close it to continue.');
            document.body.innerHTML = '';
        }
    }, 1000);