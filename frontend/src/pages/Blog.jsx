function Blog() {
  const posts = [
    { id: 1, title: 'All the Lorem Ipsum generators Internet', date: '25 May 2021', image: '/images/imag-tarot_make-a-wish.webp', category: 'vulputate' },
    { id: 2, title: 'It is a long established fact that', date: '25 May 2021', image: '/images/aggju.jpg', category: 'vulputate' },
    { id: 3, title: 'In sed tortor eget risus egestas', date: '25 May 2021', image: '/images/b25b0862914e3a91284933a7af276075.jpg', category: 'vulputate' },
    { id: 4, title: 'Curabitur vitae leo feugiat', date: '25 May 2021', image: '/images/cat-crawford-b1AsZn2C-lo-unsplash.jpg', category: 'vulputate' },
    { id: 5, title: 'Nullam et urna rhoncus purus', date: '25 May 2021', image: '/images/tengyart-VgijAV-e97Y-unsplash.jpg', category: 'vulputate' },
    { id: 6, title: 'Sed eget sapien eget felis commodo', date: '25 May 2021', image: '/images/tania-medina-zwsL1bj_yKA-unsplash.jpg', category: 'vulputate' },
  ];

  const categories = ['Pellentesque', 'Morbi viverra', 'scelerisque', 'Vestibulum', 'ultricies'];
  const recentPosts = [
    { title: 'Morbi vitae felis eget turpis', date: '16 jan, 2023', image: '/images/numerology-concept-still-life.jpg' },
    { title: 'Sed et sem at risus consectetur', date: '16 jan, 2023', image: '/images/moon-phasing1.png' },
    { title: 'Nullam mattis nisl eget', date: '16 jan, 2023', image: '/images/imag-tarot_zen.jpg' },
    { title: 'Vestibulum feugiat lorem', date: '16 jan, 2023', image: '/images/tengyart-VgijAV-e97Y-unsplash.jpg' },
  ];
  const tags = ['Vestibulum', 'Morbi', 'Curabitur', 'Nullam', 'Pellentesque'];

  return (
    <>
      {/* Sub Banner */}
      <section className="sub-banner-section float-start w-100">
        <div className="img-main-abnner d-inline-block w-100">
          <img alt="sm" src="/images/horocurty03.jpg" />
        </div>
        <div className="container">
          <h2 className="text-center text-white">Blog</h2>
          <nav className="mt-4">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item active">Blog</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Blog Content */}
      <main className="float-start w-100 body-main">
        <section className="blogs-info-div d-inline-block w-100 my-5">
          <div className="container">
            <div className="row g-5">
              {/* Left - Blog Posts */}
              <div className="col-lg-8">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="listed-bn">
                    <ul className="list-unstyled d-flex align-items-center">
                      <li className="ms-0"><a id="list" className="active"><i className="fas fa-th-list"></i></a></li>
                      <li><a id="grid"><i className="fas fa-th-large"></i></a></li>
                    </ul>
                  </div>
                  <h6 className="ashow">Showing <b>1-4</b> of <b>13</b> results</h6>
                </div>

                <div id="products" className="mt-4">
                  <div className="row justify-content-between g-5">
                    {posts.map((post) => (
                      <a href="#" key={post.id} className="item list-item col-md-6 col-lg-6 col-xl-6 view-group list-group-item text-decoration-none">
                        <div className="inside-div01">
                          <div className="left-div-list">
                            <img src={post.image} alt="pnm" />
                            <div className="hvert">
                              10<b className="d-block">Jan</b>
                            </div>
                          </div>
                          <div className="right-list-div">
                            <h6><i className="fas fa-tags"></i> {post.category}</h6>
                            <h5>{post.title}</h5>
                            <div className="d-flex align-items-center">
                              <div className="admin-t">
                                <i className="far fa-user"></i>
                                <span>By Admin</span>
                              </div>
                              <div className="admin-t">
                                <i className="fas fa-calendar-alt"></i>
                                <span>{post.date}</span>
                              </div>
                            </div>
                            <p className="mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-lg-4">
                {/* Categories */}
                <div className="right-comon-linst05 pt-0">
                  <h3>Categories</h3>
                  <ul className="mt-4 list-unstyled">
                    {categories.map((cat, idx) => (
                      <li key={idx}><a href="#">{cat}</a></li>
                    ))}
                  </ul>
                </div>

                {/* Recent Posts */}
                <div className="right-comon-linst05 mt-5">
                  <h3 className="mb-4">Recent Post</h3>
                  {recentPosts.map((post, idx) => (
                    <a href="#" key={idx} className="d-flex post-cmonk align-items-center mb-3 text-decoration-none">
                      <div className="img-small01">
                        <img alt="gmh" src={post.image} />
                      </div>
                      <div className="right-details-yui ms-3">
                        <p className="mb-1">{post.date}</p>
                        <h5>{post.title}</h5>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Tags */}
                <div className="right-comon-linst05 tabs-links mt-5">
                  <h3 className="mb-4">Tags</h3>
                  <ul className="list-unstyled d-flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <li key={idx}><a href="#" className="btn btn-sm btn-outline-secondary">{tag}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .sub-banner-section { position: relative; padding: 80px 0; background: linear-gradient(90deg, rgb(9,12,52), rgb(25,11,26)); }
        .img-main-abnner { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .img-main-abnner img { width: 100%; height: 100%; object-fit: cover; opacity: 0.3; }
        .breadcrumb { background: transparent; }
        .breadcrumb-item { color: #fff; }
        .breadcrumb-item.active { color: #f7c400; }
        
        .inside-div01 { display: flex; gap: 20px; background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; transition: 0.3s; }
        .inside-div01:hover { background: rgba(255,255,255,0.1); transform: translateY(-5px); }
        .left-div-list { position: relative; min-width: 150px; }
        .left-div-list img { width: 150px; height: 150px; object-fit: cover; border-radius: 8px; }
        .hvert { position: absolute; top: 10px; left: 10px; background: #ff6a00; color: #fff; padding: 5px 10px; border-radius: 5px; font-weight: bold; text-align: center; }
        .right-list-div h6 { color: #ff6a00; font-size: 12px; }
        .right-list-div h5 { color: #fff; font-size: 18px; margin: 10px 0; }
        .admin-t { margin-right: 15px; font-size: 12px; color: #aaa; }
        .admin-t i { margin-right: 5px; }
        .right-list-div p { color: #ccc; font-size: 14px; line-height: 1.6; }
        
        .right-comon-linst05 { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; }
        .right-comon-linst05 h3 { color: #fff; font-size: 20px; border-bottom: 2px solid #ff6a00; padding-bottom: 10px; }
        .right-comon-linst05 ul li { padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .right-comon-linst05 ul li a { color: #ccc; text-decoration: none; transition: 0.3s; }
        .right-comon-linst05 ul li a:hover { color: #ff6a00; padding-left: 10px; }
        .img-small01 { min-width: 60px; }
        .img-small01 img { width: 60px; height: 60px; object-fit: cover; border-radius: 5px; }
        .right-details-yui p { color: #888; font-size: 12px; margin: 0; }
        .right-details-yui h5 { color: #fff; font-size: 14px; margin: 0; }
        .post-cmonk:hover .right-details-yui h5 { color: #ff6a00; }
      `}</style>
    </>
  );
}

export default Blog;
