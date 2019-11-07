#include<iostream>
#include<cstdlib>
#include<ctime>
int createRandom(int index);
using namespace std;
int main(){
	
	long sum=0;
	long flag=0; 
	srand((unsigned)time(NULL)); //初始化随机数种子  
    long arr0[1000];//容器1 
    long arr1[1000];//容器2 
    long start=0,end=0;//实数轴上随机起点和终点 
    for (int i=0;i<1000;i++) 
    {
    	if(i==0)//避免%0导致异常 
    	start=i+1;
    	end=start+3;//指定起点和终点的间隔 
        arr0[i]=(long)(rand()%(start+1)+(end+3));
        arr1[i]=(long)(rand()%(start+1)+(end+3));
        start=end+1;//以上一次迭代的终点加一定间隔为下一次迭代的起点，以此保证每个数组内元素的唯一性 
        
		//cout<<arr0[i]<<endl;//测试用 
    }
    //给两个数组排序，排序后得到两个升序数组 
    for(int i=0;i<1000;i++){
    	for(int j=0;j<1000-1-i;j++)
    	if (arr0[j]>arr0[j+1])
        {
            flag= arr0[j];
            arr0[j]=arr0[j+1];
            arr0[j+1]=flag;
        }
	}
	
	for(int i=0;i<1000;i++){
    	for(int j=0;j<1000-1-i;j++)
    	if (arr0[j]>arr0[j+1])
        {
            flag= arr1[j];
            arr1[j]=arr1[j+1];
            arr1[j+1]=flag;
        }
	}
	
	//让两个指针分别指向已排序好的两个数组
	long *p0=arr0;
	long *p1=arr1;
	//如果*指针1<*指针2 移动指针1指向下一个元素 继续比较 直到 *指针1>=*指针2
	if (*p0<*p1){
		p0++;}
		
	while(*p0!=arr0[999]){//这里的单个数组是一个整数集合，所以可以直接判断值 
		while(*p0<*p1){
		p0++;
		continue;
		}
		if (*p0==*p1)	//特别地如果*指针1等于*指针2，sum++，打印输出该元素,并且将指针2移动到下一位 
		{
			sum+=1;
			cout<<*p0<<" ";
			p1++;
		}
		else{
			p1++;
		}
	}
		
	//直到遍历完整个数组1
	
    

 /*	for (int i=0;i<1000;i++){
    	for (int j=0;j<1000;i++){
    		if (arr0[i]==arr1[j]) sum=sum+1;
    		//cout<<arr0[i]<<endl;
		}
	//	cout<<arr0[i]<<"   "<<arr1[i]<<endl; 
	}*/
	
	
	
	cout<<"共有相同元素"<<sum<<"个"; 
	
	 
	


    return 0;
}

