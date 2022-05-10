// Component 구현    
class Component {
    $target;
    $state;
     constructor ($target) { 
        this.$target = $target;
        this.setup();
        this.render();
    }
    setup () {};
    mounted () {}; // 요소 마운트 필요할 경우 사용.
    template () { return '' } // 요소 리턴.
    render () {
        this.$target.innerHTML = this.template();
        this.setEvent(); 
        this.mounted(); // render 후에 mounted가 실행 된다.
    }
    setEvent () {} // 모든 이벤트를 this.$target에 등록하여 사용하면 된다.
    setState (newState) {} // 상태변경.
    
}
