<template>
  <footer class="footer-wrapper">
    <div class="footer-container container">
      <div class="footer-left">
        <div class="footer-logo">
          <img src="/logo-full.svg">
        </div>
        <div class="footer-left-group">
          <img src="/images/icons/locale.svg">
          <span>175 phố Tây Sơn, Quận Đống Đa, Thành phố Hà Nội</span>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-right-group footer-right-contact">
          <div class="footer-right-subgroup">
            <p class="footer-heading">Liên hệ</p>
            <ul>
              <li>Email: xduc24122002@gmail.com</li>
              <li>Phone: 0355937013</li>
            </ul>
          </div>
          <div class="footer-right-subgroup">
            <p class="footer-heading">Chính sách</p>
            <ul>
              <li>Chính sách riêng tư</li>
              <li>Điều khoản sử dụng</li>
            </ul>
          </div>
        </div>
        <div class="footer-right-group footer-right-social">
          <div>
            <p class="footer-heading">Kết nối với chúng tôi</p>
            <ul>
              <li>
                <img src="/images/icons/youtube.svg">
              </li>
              <li>
                <img src="/images/icons/facebook.svg">
              </li>
              <li>
                <img src="/images/icons/tiktok.svg">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer-wrapper {
  background-color: #fdf2f2;
}
.footer-container {
  padding: 4rem 0 2rem;
  display: flex;
}
.footer-left {
  width: 33%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
.footer-left-group {
  display: flex;
  column-gap: 1rem;
}
.footer-left-group img {
  width: 24px;
  height: 24px;
  margin-top: .3rem;
}
.footer-left-group span {
  padding-right: 1.5rem;
}
.footer-logo img {
  width: 300px;
}
.footer-right {
  display: flex;
  justify-content: space-between;
  width: 67%;
  padding: 1rem 1rem 1rem 6rem;
}
.footer-right-subgroup:not(:last-child) {
  margin-bottom: 1rem;
}
.footer-heading {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: .5rem;
  display: inline-block;
  cursor: default;
}
.footer-heading::after {
  content: '';
  border-bottom: 3px solid var(--color-main);
  width: 75%;
  display: block;
}
.footer-right-subgroup ul li {
  font-size: .9rem;
}
.footer-right-social ul {
  display: flex;
  column-gap: 8px;
}
</style>