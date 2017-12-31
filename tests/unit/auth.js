function orderAuth(){

  // 判断 是否登录 （钱包是否存在）
  // 判断：钱包地址是否在白名单里
  // 判断：系统配置是否设置（应该是有默认值的）
  // 判断：LRC 配置是否配置
  if (!this.wallet) {

      const detail = {
          text: 'Set Wallet First!',
          category: 'warning',
          duration: 5000,
          link: '/#/wallet',
          linkText: 'Go to set Wallet'
      };

      this.dispatchEvent(new CustomEvent('notification', {
          bubbles: true,
          composed: true,
          detail: detail
      }));

      return;
  }
  if (!this.appConfig || !this.settingsMarginSplit || !this.settingsLrcFee) {
      return;
  }
  if (this.appConfig.whiteList && this.appConfig.whiteList.indexOf(this.wallet.address) < 0) {
      const detail = {
          text: 'Your address is not in white list, could not submit order',
          category: "warning",
          duration: 5000
      };
      this.dispatchEvent(new CustomEvent('notification', {
          bubbles: true,
          composed: true,
          detail: detail
      }));
      return;
  }
}