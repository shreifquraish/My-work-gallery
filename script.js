// تنشيط القائمة المتنقلة على الهواتف
document.addEventListener('DOMContentLoaded', function() {
    // عناصر القائمة المتنقلة
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // تغيير الأيقونة
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('#mainNav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // تحديث السنة الحالية في الفوتر
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // تهيئة Fancybox للمعرض
    if (typeof $.fancybox !== 'undefined') {
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
                "slideShow",
                "thumbs",
                "zoom",
                "fullScreen",
                "share",
                "close"
            ],
            loop: true,
            protect: true,
            animationEffect: "zoom-in-out",
            transitionEffect: "circular",
            hash: false
        });
    }
    
    // تأثيرات الظهور التدريجي للعناصر
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeInOnScroll.observe(element);
    });
    
    // معاينة الفيديو
    const videoPlayers = document.querySelectorAll('.video-player i');
    videoPlayers.forEach(player => {
        player.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            const videoTitle = this.getAttribute('data-title') || 'عرض تقديمي';
            
            if (videoUrl) {
                // فتح الفيديو في نافذة منبثقة
                window.open(videoUrl, '_blank', 'width=800,height=600');
            } else {
                alert('عذراً، رابط الفيديو غير متوفر حالياً.');
            }
        });
    });
    
    // تنشيط التبويبات في صفحات المعرض
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // إزالة النشاط من جميع الأزرار
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // إضافة النشاط للزر المحدد
                this.classList.add('active');
                
                // الحصول على قيمة التصفية
                const filterValue = this.getAttribute('data-filter');
                
                // عرض/إخفاء العناصر بناءً على التصفية
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // تأثير تحميل الصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // إضافة تأثير تحميل للصور
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // تعيين القيم الافتراضية للصور غير المحملة
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.95)';
            img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
    });
    
    // إضافة تأثير التمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // إذا كان الرابط يشير إلى قسم في نفس الصفحة
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // رسالة ترحيب عند تحميل الصفحة
    setTimeout(() => {
        console.log('مرحباً بك في موقع شريف قرعيش - معرض الأعمال الاحترافي');
        console.log('تم تطوير الموقع باستخدام HTML, CSS, JavaScript');
    }, 1000);
});