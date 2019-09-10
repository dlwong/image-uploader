const importAll = (r) => {
  let images = [];
  
  r.keys().map(item => { 
                      images.push(r(item)); 
                    });

  return images;
}

export default importAll;